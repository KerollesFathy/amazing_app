import frappe

@frappe.whitelist()
def make_vip_customer(customer_name):
	vip_customer = frappe.new_doc("VIP Customer")
	vip_customer.first_name = customer_name
	vip_customer.insert(ignore_permissions=True)
	print(">>>>>>>>>>>>>>>>", vip_customer.name)
	return vip_customer.name

@frappe.whitelist()
def make_vip_customer_via_dialog(first_name, last_name, user_remark):
	frappe.get_doc({
		"doctype": "VIP Customer",
		"first_name": first_name,
		"last_name": last_name,
		"user_remark": user_remark,
	}).insert(ignore_permissions=True)
	frappe.msgprint("created successfuly", alert=True, indicator="green")