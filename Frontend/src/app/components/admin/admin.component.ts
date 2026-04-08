import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private productService = inject(ProductService);

  allProducts: any[] = [];
  loading = false;
  feedback = '';
  feedbackType: 'success' | 'danger' = 'success';

  activeTab: 'products' | 'promotions' = 'products';

  // Form state
  showForm = false;
  editingId: number | null = null;
  form = this.emptyForm(false);
  saving = false;

  // Produto base selecionado para promoção
  selectedBaseId: number | null = null;
  // Preço da lata base ao editar um pack (para recalcular ao mudar packSize ou desconto)
  editingBasePrice: number | null = null;

  // Image upload
  imageFile: File | null = null;
  imagePreview: string | null = null;
  uploadingImage = false;

  ngOnInit() {
    this.loadProducts();
  }

  /** Produtos regulares para o dropdown "Produto base" */
  get regularProducts(): any[] {
    return this.allProducts.filter(p => !p.isPromotion);
  }

  get products(): any[] {
    return this.allProducts.filter(p =>
      this.activeTab === 'promotions' ? p.isPromotion : !p.isPromotion
    );
  }

  setTab(tab: 'products' | 'promotions') {
    this.activeTab = tab;
    this.showForm = false;
    this.imagePreview = null;
    this.imageFile = null;
    this.selectedBaseId = null;
    this.editingBasePrice = null;
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => { this.allProducts = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openCreate() {
    this.editingId = null;
    this.selectedBaseId = null;
    this.form = this.emptyForm(this.activeTab === 'promotions');
    this.imagePreview = null;
    this.imageFile = null;
    this.showForm = true;
  }

  openEdit(p: any) {
    this.editingId = p.id;
    this.selectedBaseId = null;
    this.form = {
      name: p.name, description: p.description, price: p.price,
      imageUrl: p.imageUrl || '', stockQuantity: p.stockQuantity,
      category: p.category, isPromotion: p.isPromotion ?? false,
      discountPercentage: p.discountPercentage || 0,
      packSize: p.packSize || null,
      caffeineMg: p.caffeineMg || null, caloriesKcal: p.caloriesKcal || null,
      sugarG: p.sugarG || null, volumeMl: p.volumeMl || null,
      ingredients: p.ingredients || ''
    };
    // Calcula o preço unitário base para recalcular ao editar pack
    if (p.isPromotion && p.packSize && p.discountPercentage) {
      this.editingBasePrice = +(p.price / p.packSize / (1 - p.discountPercentage / 100)).toFixed(2);
    } else {
      this.editingBasePrice = null;
    }
    this.imagePreview = p.imageUrl || null;
    this.imageFile = null;
    this.showForm = true;
  }

  /** Chamado quando o usuário seleciona um produto base no dropdown */
  onBaseProductChange() {
    if (!this.selectedBaseId) return;
    const base = this.allProducts.find(p => p.id === +this.selectedBaseId!);
    if (!base) return;

    const pack = this.form.packSize || 1;
    this.form = {
      ...this.form,
      name: `${base.name} — PACK ${pack}`,
      description: base.description || '',
      imageUrl: base.imageUrl || '',
      category: base.category || 'Monster Energy',
      caffeineMg: base.caffeineMg || null,
      caloriesKcal: base.caloriesKcal || null,
      sugarG: base.sugarG || null,
      volumeMl: base.volumeMl || null,
      ingredients: base.ingredients || '',
      price: this.calcPrice(base.price, pack, this.form.discountPercentage)
    };
    this.imagePreview = base.imageUrl || null;
    this.imageFile = null;
  }

  /** Recalcula nome e preço quando o pack ou desconto mudam (criação ou edição) */
  onPackOrDiscountChange() {
    const pack = this.form.packSize || 1;

    if (this.selectedBaseId) {
      // Criando novo pack: recalcula com base no produto selecionado
      const base = this.allProducts.find(p => p.id === +this.selectedBaseId!);
      if (!base) return;
      this.form.name = `${base.name} — PACK ${pack}`;
      this.form.price = this.calcPrice(base.price, pack, this.form.discountPercentage);
    } else if (this.editingId && this.editingBasePrice != null) {
      // Editando pack existente: recalcula com o preço unitário base derivado
      this.form.price = this.calcPrice(this.editingBasePrice, pack, this.form.discountPercentage);
    }
  }

  private calcPrice(basePrice: number, pack: number, discount: number): number {
    const full = basePrice * pack;
    return discount > 0 ? +(full * (1 - discount / 100)).toFixed(2) : +full.toFixed(2);
  }

  cancelForm() {
    this.showForm = false;
    this.selectedBaseId = null;
    this.editingBasePrice = null;
    this.imageFile = null;
    this.imagePreview = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.imageFile = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => this.imagePreview = e.target?.result as string;
    reader.readAsDataURL(this.imageFile);
  }

  save() {
    if (this.imageFile) {
      this.uploadingImage = true;
      this.productService.uploadImage(this.imageFile).subscribe({
        next: (res) => {
          this.form.imageUrl = res.imageUrl;
          this.uploadingImage = false;
          this.submitForm();
        },
        error: () => {
          this.setFeedback('Erro ao fazer upload da imagem.', 'danger');
          this.uploadingImage = false;
        }
      });
    } else {
      this.submitForm();
    }
  }

  private submitForm() {
    this.saving = true;
    const request = this.editingId
      ? this.productService.update(this.editingId, this.form)
      : this.productService.create(this.form);

    request.subscribe({
      next: () => {
        this.setFeedback(this.editingId ? 'Atualizado!' : 'Criado!', 'success');
        this.showForm = false;
        this.saving = false;
        this.selectedBaseId = null;
        this.loadProducts();
      },
      error: (err) => {
        const status = err?.status;
        const msg = status === 401 || status === 403
          ? 'Sem permissão. Faça login como Admin.'
          : status === 400
          ? 'Dados inválidos: ' + (err?.error?.message || JSON.stringify(err?.error) || '')
          : `Erro ao salvar (${status ?? 'sem resposta'}).`;
        this.setFeedback(msg, 'danger');
        this.saving = false;
      }
    });
  }

  deleteProduct(id: number, name: string) {
    if (!confirm(`Excluir "${name}"? Esta ação não pode ser desfeita.`)) return;
    this.productService.delete(id).subscribe({
      next: () => {
        this.setFeedback(`"${name}" excluído.`, 'success');
        this.loadProducts();
      },
      error: () => this.setFeedback('Erro ao excluir.', 'danger')
    });
  }

  private emptyForm(isPromotion: boolean) {
    return {
      name: '', description: '', price: 0 as number, imageUrl: '',
      stockQuantity: 0, category: 'Monster Energy',
      isPromotion,
      discountPercentage: isPromotion ? 10 : 0,
      packSize: null as number | null,
      caffeineMg: null as number | null, caloriesKcal: null as number | null,
      sugarG: null as number | null, volumeMl: null as number | null,
      ingredients: ''
    };
  }

  private setFeedback(msg: string, type: 'success' | 'danger') {
    this.feedback = msg;
    this.feedbackType = type;
    setTimeout(() => this.feedback = '', 4000);
  }
}
