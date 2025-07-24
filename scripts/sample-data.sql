-- Insert sample users
INSERT INTO users (user_id, name, email, password_hash, role, department, status, orders_handled, permissions) VALUES
('USER-001', 'Admin User', 'admin@easegiv.com', '$2b$10$example_hash', 'Super Admin', 'Management', 'Active', 0, ARRAY['all']),
('USER-002', 'John Manager', 'john@easegiv.com', '$2b$10$example_hash', 'Manager', 'Operations', 'Active', 156, ARRAY['orders', 'products', 'customers', 'analytics']),
('USER-003', 'Sarah Editor', 'sarah@easegiv.com', '$2b$10$example_hash', 'Editor', 'Marketing', 'Active', 89, ARRAY['products', 'content']),
('USER-004', 'Mike Viewer', 'mike@easegiv.com', '$2b$10$example_hash', 'Viewer', 'Support', 'Active', 0, ARRAY['view'])
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample customers
INSERT INTO customers (customer_id, name, email, phone, company, gstin, city, state, status, customer_type, total_orders, total_spent, avg_order_value) VALUES
('CUST-001', 'Rajesh Kumar', 'rajesh@company.com', '+91-9876543210', 'Kumar Enterprises', '29ABCDE1234F1Z5', 'Bangalore', 'Karnataka', 'Active', 'VIP', 5, 45000.00, 9000.00),
('CUST-002', 'Priya Sharma', 'priya@business.com', '+91-9876543211', 'Sharma Business Solutions', '27FGHIJ5678K2L6', 'Mumbai', 'Maharashtra', 'Active', 'Premium', 12, 78500.00, 6541.67),
('CUST-003', 'Tech Solutions Ltd', 'orders@techsol.com', '+91-9876543212', 'Tech Solutions Ltd', '36MNOPQ9012R3S7', 'Hyderabad', 'Telangana', 'Active', 'Enterprise', 8, 125000.00, 15625.00),
('CUST-004', 'Marketing Pro', 'team@marketingpro.com', '+91-9876543213', 'Marketing Pro Agency', '19RSTUVW3456X8Y9', 'Chennai', 'Tamil Nadu', 'Active', 'Premium', 6, 32000.00, 5333.33),
('CUST-005', 'StartupHub', 'orders@startuphub.com', '+91-9876543214', 'StartupHub Incubator', '07ABCDEF7890G1H2', 'Pune', 'Maharashtra', 'Active', 'VIP', 10, 89000.00, 8900.00)
ON CONFLICT (customer_id) DO NOTHING;

-- Insert sample products
INSERT INTO products (product_id, name, slug, category_id, subcategory, sku, price, cost_price, margin, stock_quantity, supplier, total_orders, total_revenue) VALUES
('PROD-001', 'Custom T-Shirts', 'custom-t-shirts', 1, 'T-Shirts', 'TSH-001', 150.00, 80.00, 70.00, 500, 'Textile Co.', 234, 35100.00),
('PROD-002', 'Business Cards', 'business-cards', 2, 'Cards', 'BC-002', 5.00, 2.00, 3.00, 1000, 'Print Solutions', 567, 2835.00),
('PROD-003', 'Promotional Mugs', 'promotional-mugs', 3, 'Mugs', 'MUG-003', 40.00, 25.00, 15.00, 200, 'Ceramic Works', 123, 4920.00),
('PROD-004', 'Corporate Notebooks', 'corporate-notebooks', 2, 'Notebooks', 'NB-004', 80.00, 45.00, 35.00, 150, 'Paper Mills', 89, 7120.00),
('PROD-005', 'Polo Shirts', 'polo-shirts', 1, 'Polo Shirts', 'PS-005', 200.00, 120.00, 80.00, 300, 'Textile Co.', 156, 31200.00),
('PROD-006', 'Water Bottles', 'water-bottles', 3, 'Bottles', 'WB-006', 60.00, 35.00, 25.00, 250, 'Plastic Industries', 98, 5880.00)
ON CONFLICT (product_id) DO NOTHING;

-- Insert sample orders
INSERT INTO orders (order_id, customer_id, assigned_to, status, priority, subtotal, discount_amount, gst_amount, total_amount, created_at) VALUES
('ORD-001', 1, 2, 'In Production', 'High', 15000.00, 0.00, 2700.00, 17700.00, '2024-01-15'),
('ORD-002', 2, 3, 'Delivered', 'Medium', 2500.00, 250.00, 405.00, 2655.00, '2024-01-14'),
('ORD-003', 3, 2, 'Pending', 'High', 25000.00, 2500.00, 4050.00, 26550.00, '2024-01-13'),
('ORD-004', 4, 3, 'Shipped', 'Low', 8000.00, 800.00, 1296.00, 8496.00, '2024-01-12'),
('ORD-005', 5, 2, 'In Production', 'Medium', 12000.00, 1200.00, 1944.00, 12744.00, '2024-01-11')
ON CONFLICT (order_id) DO NOTHING;

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES
(1, 1, 100, 150.00, 15000.00),
(2, 2, 500, 5.00, 2500.00),
(3, 4, 50, 500.00, 25000.00),
(4, 3, 200, 40.00, 8000.00),
(5, 4, 150, 80.00, 12000.00);

-- Insert sample coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, max_discount_amount, usage_limit, is_active) VALUES
('BULK100', '10% discount on bulk orders', 'percentage', 10.00, 10000.00, 2000.00, 100, true),
('FIRST500', '₹500 off on first order', 'fixed', 500.00, 5000.00, NULL, 50, true),
('PREMIUM15', '15% discount for premium customers', 'percentage', 15.00, 15000.00, 3000.00, 200, true),
('NEWCUST20', '20% discount for new customers', 'percentage', 20.00, 8000.00, 2500.00, 150, true),
('BULK500', '₹500 off on orders above ₹20000', 'fixed', 500.00, 20000.00, NULL, 75, true)
ON CONFLICT (code) DO NOTHING;

-- Insert sample activity logs
INSERT INTO activity_logs (user_id, action, entity_type, entity_id, details) VALUES
(2, 'Order Created', 'order', 1, '{"order_id": "ORD-001", "customer": "Rajesh Kumar", "amount": 17700}'),
(3, 'Product Updated', 'product', 2, '{"product_id": "PROD-002", "field": "stock_quantity", "old_value": 950, "new_value": 1000}'),
(2, 'Customer Added', 'customer', 4, '{"customer_id": "CUST-004", "name": "Marketing Pro", "company": "Marketing Pro Agency"}'),
(1, 'User Role Updated', 'user', 3, '{"user_id": "USER-003", "old_role": "Viewer", "new_role": "Editor"}'),
(2, 'Order Status Updated', 'order', 2, '{"order_id": "ORD-002", "old_status": "Shipped", "new_status": "Delivered"}');

-- Update customer statistics
UPDATE customers SET 
    last_order_date = '2024-01-15',
    updated_at = CURRENT_TIMESTAMP
WHERE customer_id = 'CUST-001';

UPDATE customers SET 
    last_order_date = '2024-01-14',
    updated_at = CURRENT_TIMESTAMP
WHERE customer_id = 'CUST-002';

UPDATE customers SET 
    last_order_date = '2024-01-13',
    updated_at = CURRENT_TIMESTAMP
WHERE customer_id = 'CUST-003';

-- Update user last login times
UPDATE users SET last_login = '2024-01-15 10:30:00' WHERE user_id = 'USER-001';
UPDATE users SET last_login = '2024-01-15 09:15:00' WHERE user_id = 'USER-002';
UPDATE users SET last_login = '2024-01-14 16:45:00' WHERE user_id = 'USER-003';
UPDATE users SET last_login = '2024-01-14 14:30:00' WHERE user_id = 'USER-004';
