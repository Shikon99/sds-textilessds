import { query, run, createId } from './connection';

// Users
export const users = {
  async create(email: string, passwordHash: string, name: string, phone?: string) {
    const id = await createId();
    await run(
      `INSERT INTO users (id, email, password_hash, name, phone) VALUES (?, ?, ?, ?, ?)`,
      [id, email, passwordHash, name, phone || null]
    );
    return id;
  },

  async findByEmail(email: string) {
    const result = await query(`SELECT * FROM users WHERE email = ? LIMIT 1`, [email]);
    return result.results?.[0];
  },

  async findById(id: string) {
    const result = await query(`SELECT * FROM users WHERE id = ? LIMIT 1`, [id]);
    return result.results?.[0];
  },

  async update(id: string, data: any) {
    const updates = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(data);
    await run(`UPDATE users SET ${updates}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [
      ...values,
      id,
    ]);
  },
};

// Products
export const products = {
  async create(data: any) {
    const id = await createId();
    const keys = ['id', ...Object.keys(data)];
    const placeholders = keys.map(() => '?').join(', ');
    await run(`INSERT INTO products (${keys.join(', ')}) VALUES (${placeholders})`, [
      id,
      ...Object.values(data),
    ]);
    return id;
  },

  async findById(id: string) {
    const result = await query(`SELECT * FROM products WHERE id = ? LIMIT 1`, [id]);
    return result.results?.[0];
  },

  async findBySlug(slug: string) {
    const result = await query(`SELECT * FROM products WHERE slug = ? LIMIT 1`, [slug]);
    return result.results?.[0];
  },

  async list(limit: number = 20, offset: number = 0, filters?: any) {
    let sql = 'SELECT * FROM products WHERE status = "active"';
    const params: any[] = [];

    if (filters?.categoryId) {
      sql += ' AND category_id = ?';
      params.push(filters.categoryId);
    }
    if (filters?.featured) {
      sql += ' AND featured = 1';
    }
    if (filters?.search) {
      sql += ' AND (name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const result = await query(sql, params);
    return result.results || [];
  },

  async update(id: string, data: any) {
    const updates = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(data);
    await run(`UPDATE products SET ${updates}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [
      ...values,
      id,
    ]);
  },

  async delete(id: string) {
    await run(`DELETE FROM products WHERE id = ?`, [id]);
  },
};

// Categories
export const categories = {
  async create(data: any) {
    const id = await createId();
    const keys = ['id', ...Object.keys(data)];
    const placeholders = keys.map(() => '?').join(', ');
    await run(`INSERT INTO categories (${keys.join(', ')}) VALUES (${placeholders})`, [
      id,
      ...Object.values(data),
    ]);
    return id;
  },

  async findById(id: string) {
    const result = await query(`SELECT * FROM categories WHERE id = ? LIMIT 1`, [id]);
    return result.results?.[0];
  },

  async findBySlug(slug: string) {
    const result = await query(`SELECT * FROM categories WHERE slug = ? LIMIT 1`, [slug]);
    return result.results?.[0];
  },

  async list() {
    const result = await query(`SELECT * FROM categories WHERE active = 1 ORDER BY position`);
    return result.results || [];
  },

  async update(id: string, data: any) {
    const updates = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(data);
    await run(`UPDATE categories SET ${updates} WHERE id = ?`, [...values, id]);
  },
};

// Orders
export const orders = {
  async create(data: any) {
    const id = await createId();
    const keys = ['id', ...Object.keys(data)];
    const placeholders = keys.map(() => '?').join(', ');
    await run(`INSERT INTO orders (${keys.join(', ')}) VALUES (${placeholders})`, [
      id,
      ...Object.values(data),
    ]);
    return id;
  },

  async findById(id: string) {
    const result = await query(`SELECT * FROM orders WHERE id = ? LIMIT 1`, [id]);
    return result.results?.[0];
  },

  async findByOrderNumber(orderNumber: string) {
    const result = await query(`SELECT * FROM orders WHERE order_number = ? LIMIT 1`, [orderNumber]);
    return result.results?.[0];
  },

  async findByPhoneAndOrderNumber(phone: string, orderNumber: string) {
    const result = await query(
      `SELECT * FROM orders WHERE (guest_phone = ? OR (user_id IN (SELECT id FROM users WHERE phone = ?))) AND order_number = ? LIMIT 1`,
      [phone, phone, orderNumber]
    );
    return result.results?.[0];
  },

  async list(limit: number = 20, offset: number = 0, filters?: any) {
    let sql = 'SELECT * FROM orders WHERE 1=1';
    const params: any[] = [];

    if (filters?.userId) {
      sql += ' AND user_id = ?';
      params.push(filters.userId);
    }
    if (filters?.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const result = await query(sql, params);
    return result.results || [];
  },

  async update(id: string, data: any) {
    const updates = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(data);
    await run(`UPDATE orders SET ${updates}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [
      ...values,
      id,
    ]);
  },
};

// Order tracking
export const orderTracking = {
  async addStatus(orderId: string, status: string, adminNotes?: string) {
    const id = await createId();
    await run(
      `INSERT INTO order_tracking (id, order_id, status, admin_notes) VALUES (?, ?, ?, ?)`,
      [id, orderId, status, adminNotes || null]
    );
  },

  async getHistory(orderId: string) {
    const result = await query(
      `SELECT * FROM order_tracking WHERE order_id = ? ORDER BY timestamp DESC`,
      [orderId]
    );
    return result.results || [];
  },
};

// Carts
export const carts = {
  async findOrCreate(userId?: string, sessionId?: string) {
    if (userId) {
      const result = await query(`SELECT * FROM carts WHERE user_id = ? LIMIT 1`, [userId]);
      if (result.results?.[0]) return result.results[0];
    }

    if (sessionId) {
      const result = await query(`SELECT * FROM carts WHERE session_id = ? LIMIT 1`, [sessionId]);
      if (result.results?.[0]) return result.results[0];
    }

    const id = await createId();
    await run(`INSERT INTO carts (id, user_id, session_id) VALUES (?, ?, ?)`, [
      id,
      userId || null,
      sessionId || null,
    ]);
    return { id, user_id: userId || null, session_id: sessionId || null };
  },

  async getItems(cartId: string) {
    const result = await query(
      `SELECT ci.*, p.name, p.slug, p.price, p.discount_price, pi.r2_key
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.position = 0
       WHERE ci.cart_id = ?`,
      [cartId]
    );
    return result.results || [];
  },

  async addItem(cartId: string, productId: string, quantity: number, price: number, variantId?: string) {
    const id = await createId();
    await run(
      `INSERT INTO cart_items (id, cart_id, product_id, variant_id, quantity, price_at_time) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, cartId, productId, variantId || null, quantity, price]
    );
  },

  async updateItem(cartItemId: string, quantity: number) {
    await run(`UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [
      quantity,
      cartItemId,
    ]);
  },

  async removeItem(cartItemId: string) {
    await run(`DELETE FROM cart_items WHERE id = ?`, [cartItemId]);
  },

  async clear(cartId: string) {
    await run(`DELETE FROM cart_items WHERE cart_id = ?`, [cartId]);
  },
};

// Wishlists
export const wishlists = {
  async findOrCreate(userId?: string, sessionId?: string) {
    if (userId) {
      const result = await query(`SELECT * FROM wishlists WHERE user_id = ? LIMIT 1`, [userId]);
      if (result.results?.[0]) return result.results[0];
    }

    if (sessionId) {
      const result = await query(`SELECT * FROM wishlists WHERE session_id = ? LIMIT 1`, [sessionId]);
      if (result.results?.[0]) return result.results[0];
    }

    const id = await createId();
    await run(`INSERT INTO wishlists (id, user_id, session_id) VALUES (?, ?, ?)`, [
      id,
      userId || null,
      sessionId || null,
    ]);
    return { id, user_id: userId || null, session_id: sessionId || null };
  },

  async getItems(wishlistId: string) {
    const result = await query(
      `SELECT wi.*, p.name, p.slug, p.price, p.discount_price, pi.r2_key
       FROM wishlist_items wi
       JOIN products p ON wi.product_id = p.id
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.position = 0
       WHERE wi.wishlist_id = ?`,
      [wishlistId]
    );
    return result.results || [];
  },

  async addItem(wishlistId: string, productId: string) {
    const id = await createId();
    await run(
      `INSERT INTO wishlist_items (id, wishlist_id, product_id) VALUES (?, ?, ?)`,
      [id, wishlistId, productId]
    );
  },

  async removeItem(wishlistId: string, productId: string) {
    await run(`DELETE FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?`, [
      wishlistId,
      productId,
    ]);
  },

  async clear(wishlistId: string) {
    await run(`DELETE FROM wishlist_items WHERE wishlist_id = ?`, [wishlistId]);
  },
};

// Coupons
export const coupons = {
  async findByCode(code: string) {
    const result = await query(
      `SELECT * FROM coupons WHERE code = ? AND active = 1 AND (valid_to IS NULL OR valid_to > CURRENT_TIMESTAMP) LIMIT 1`,
      [code.toUpperCase()]
    );
    return result.results?.[0];
  },

  async validateAndApply(code: string, orderValue: number) {
    const coupon = await this.findByCode(code);
    if (!coupon) return null;

    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return null;
    }

    if (coupon.min_order_value && orderValue < coupon.min_order_value) {
      return null;
    }

    return coupon;
  },
};

// Admin Query Functions
export async function getProducts(filters: any = {}) {
  const { page = 1, limit = 20, category, status } = filters;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM products WHERE 1=1';
  const params: any[] = [];

  if (category) {
    sql += ' AND category_id = ?';
    params.push(category);
  }

  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }

  sql += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const result = await query(sql, params);
  return { products: result.results || [], total: result.results?.length || 0 };
}

export async function createProduct(data: any) {
  const id = await createId();
  await run(
    `INSERT INTO products (id, name, sku, description, price, discount_price, category_id, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, data.name, data.sku, data.description, data.price, data.discount_price || null, data.category_id || null, 'active', new Date()]
  );
  return { id, ...data };
}

export async function updateProduct(id: number, data: any) {
  const updates = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(', ');
  const values = Object.values(data);
  await run(`UPDATE products SET ${updates} WHERE id = ?`, [...values, id]);
  return { id, ...data };
}

export async function deleteProduct(id: number) {
  await run(`DELETE FROM products WHERE id = ?`, [id]);
}

export async function createProductImage(data: any) {
  const id = await createId();
  await run(
    `INSERT INTO product_images (id, product_id, r2_key, alt_text, position) VALUES (?, ?, ?, ?, ?)`,
    [id, data.product_id, data.r2_key, data.alt_text || null, data.position || 0]
  );
  return id;
}

export async function getOrders(filters: any = {}) {
  const { page = 1, limit = 20, status, startDate, endDate } = filters;
  const offset = (page - 1) * limit;

  let sql = 'SELECT * FROM orders WHERE 1=1';
  const params: any[] = [];

  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }

  if (startDate) {
    sql += ' AND created_at >= ?';
    params.push(startDate);
  }

  if (endDate) {
    sql += ' AND created_at <= ?';
    params.push(endDate);
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const result = await query(sql, params);
  return { orders: result.results || [], total: result.results?.length || 0 };
}

export async function getOrderById(id: number) {
  const result = await query('SELECT * FROM orders WHERE id = ? LIMIT 1', [id]);
  return result.results?.[0];
}

export async function updateOrderStatus(orderId: number, status: string) {
  await run('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
}

export async function createOrderTracking(data: any) {
  const id = await createId();
  await run(
    `INSERT INTO order_tracking (id, order_id, status, admin_notes, timestamp) VALUES (?, ?, ?, ?, ?)`,
    [id, data.order_id, data.status, data.admin_notes || null, data.timestamp || new Date()]
  );
  return id;
}
