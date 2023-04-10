export class ProductStockAdapter {
  static mapProductWithStock(products, stocks) {
    return products.map((product) => {
      const stock = stocks.find((s) => s.product_id === product.id);

      if (stock) {
        return { ...product, count: stock.count };
      }

      return { ...product, count: null };
    });
  }
}
