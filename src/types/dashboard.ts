export type DashboardResponse = {
  new_request_today: number;
  request_incomplete: number;
  request_complete: number;
  total_subscriptions: number;
  new_subscriptions_today: number;
  paused_subscriptions: number;
  subs_cancel_all: number;
  subs_cancel_today: number;
  all_reviews: number;
  new_reviews: number;
  monthly_sales: number;
  monthly_refunds: number;
  monthly_total_sales: number;
  total_customers: number;
  new_customers_today: number;
  deleted_customers_today: number;
};
