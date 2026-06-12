// Guest cart management for users not logged in
// Uses localStorage to persist cart data

export interface GuestCartItem {
  id: string
  productId: string
  quantity: number
  addedAt: number
}

export interface GuestCart {
  items: GuestCartItem[]
  lastUpdated: number
}

const STORAGE_KEY = 'sds-guest-cart'

export function getGuestCart(): GuestCart {
  if (typeof window === 'undefined') return { items: [], lastUpdated: Date.now() }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { items: [], lastUpdated: Date.now() }
  } catch {
    return { items: [], lastUpdated: Date.now() }
  }
}

export function addToGuestCart(productId: string, quantity: number = 1): void {
  if (typeof window === 'undefined') return

  try {
    const cart = getGuestCart()
    const existingItem = cart.items.find((item) => item.productId === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({
        id: `${productId}-${Date.now()}`,
        productId,
        quantity,
        addedAt: Date.now(),
      })
    }

    cart.lastUpdated = Date.now()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))

    // Dispatch event for components to listen
    window.dispatchEvent(new CustomEvent('guest-cart-updated', { detail: cart }))
  } catch (error) {
    console.error('Error adding to guest cart:', error)
  }
}

export function removeFromGuestCart(itemId: string): void {
  if (typeof window === 'undefined') return

  try {
    const cart = getGuestCart()
    cart.items = cart.items.filter((item) => item.id !== itemId)
    cart.lastUpdated = Date.now()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    window.dispatchEvent(new CustomEvent('guest-cart-updated', { detail: cart }))
  } catch (error) {
    console.error('Error removing from guest cart:', error)
  }
}

export function updateGuestCartQuantity(itemId: string, quantity: number): void {
  if (typeof window === 'undefined') return

  try {
    const cart = getGuestCart()
    const item = cart.items.find((i) => i.id === itemId)

    if (item) {
      if (quantity <= 0) {
        removeFromGuestCart(itemId)
      } else {
        item.quantity = quantity
        cart.lastUpdated = Date.now()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
        window.dispatchEvent(new CustomEvent('guest-cart-updated', { detail: cart }))
      }
    }
  } catch (error) {
    console.error('Error updating guest cart:', error)
  }
}

export function clearGuestCart(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent('guest-cart-updated', { detail: { items: [], lastUpdated: Date.now() } }))
  } catch (error) {
    console.error('Error clearing guest cart:', error)
  }
}

export function useGuestCartListener(callback: (cart: GuestCart) => void) {
  if (typeof window === 'undefined') return

  const handler = (event: CustomEvent) => {
    callback(event.detail)
  }

  window.addEventListener('guest-cart-updated', handler as EventListener)
  return () => window.removeEventListener('guest-cart-updated', handler as EventListener)
}
