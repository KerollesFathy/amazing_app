frappe.ui.form.on("Customer", {
	refresh(frm) {
		console.log("refreshing");
		frm.add_custom_button("Make VIP Customer", () => {
			// frappe.msgprint(`The Customer Name is ${frm.doc.customer_name} `);
			frappe.call({
    			method: 'amazing_app.utils.make_vip_customer',
				args: {
					customer_name: frm.doc.customer_name
				},
				// disable the button until the request is completed
				btn: $('.primary-action'),
				// freeze the screen until the request is completed
				freeze: true,
				callback: (r) => {
					// on success
					if (!r.exc) {
						console.log(r)
						let vip_docname = r.message;
						frappe.show_alert({
							message:__(`Created VIP Customer ${vip_docname} Successfuly`),
							indicator:"green"
						}, 10);
						
					}
				},
				error: (r) => {
					// on error
				}
			})
		}, "Group of buttons")
	}
});