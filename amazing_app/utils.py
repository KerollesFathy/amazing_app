import frappe

@frappe.whitelist()
def make_vip_customer(customer_name):
	vip_customer = frappe.new_doc("VIP Customer")
	vip_customer.first_name = customer_name
	vip_customer.insert(ignore_permissions=True)
	print(">>>>>>>>>>>>>>>>", vip_customer.name)
	return vip_customer.name