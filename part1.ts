type Transaction = {
    category: string;
    price: number;
    quantity: number;
}
function calculateRevenueByCategory(transactions: Transaction[]): Record<string, number> {
    const revenueByCategory: Record<string, number> = {};
    for (const transaction of transactions) {
        // Apply 10% discount if quantity > 5
        let total = transaction.price * transaction.quantity;
        if (transaction.quantity > 5) {
            total *= 0.9; // 10% discount
        }
        // Filter out transactions with total < 50
        if (total >= 50) {
            if (!revenueByCategory[transaction.category]) {
                revenueByCategory[transaction.category] = 0;
            }
            revenueByCategory[transaction.category] += total;
        }
    }
    return revenueByCategory;
}

function calculateRevenueByCategoryFP(transactions: Transaction[]): Record<string, number> {
    return transactions
      .map(t => ({
        category: t.category,
        total: t.price * t.quantity * (t.quantity > 5 ? 0.9 : 1),
      }))
      .filter(t => t.total >= 50)
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] ?? 0) + t.total;
        return acc;
      }, {} as Record<string, number>);
  }
  
