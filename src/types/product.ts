export interface ProductDimensions {
  width: number
  height: number
  depth: number
}

export interface ProductReview {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface ProductMeta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  sku: string
  weight: number
  dimensions: ProductDimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: ProductReview[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: ProductMeta
  images: string[]
  thumbnail: string
}

export interface PaginatedResponse<TItem> {
  total: number
  skip: number
  limit: number
  products: TItem[]
}

export type ProductsResponse = PaginatedResponse<Product>

export interface ProductCategory {
  slug: string
  name: string
  url: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  token: string
}

export interface LoginRequest {
  username: string
  password: string
}
