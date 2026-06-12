'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Heart, ShoppingCart } from 'lucide-react'

interface QuickViewModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
  onAddToCart: (quantity: number) => void
}

export function QuickViewModal({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.image_url && (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4">
            {/* Price */}
            <div>
              <p className="text-3xl font-bold text-blue-600">${product.price}</p>
              {product.original_price && (
                <p className="text-gray-500 line-through">${product.original_price}</p>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-gray-600">({product.total_ratings} reviews)</span>
              </div>
            )}

            {/* Variants */}
            {product.colors && (
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 border rounded ${
                        selectedColor === color ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <div className="flex gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 border rounded ${
                        selectedSize === size ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-2 border rounded w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="text-sm">
              {product.stock_quantity > 0 ? (
                <p className="text-green-600">✓ In Stock ({product.stock_quantity} available)</p>
              ) : (
                <p className="text-red-600">Out of Stock</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <button
                onClick={() => onAddToCart(quantity)}
                disabled={product.stock_quantity === 0}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="border border-gray-300 p-2 rounded-lg hover:bg-gray-50">
                <Heart size={20} />
              </button>
            </div>

            {/* Description */}
            <div className="text-sm text-gray-600 border-t pt-4">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
