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

		// new custom button

		frm.add_custom_button("Make VIP Customer via Dialog", () => {
			let dialog = new frappe.ui.Dialog({
				title: 'Create VIP Customer',
				fields: [
					{
						label: 'First Name',
						fieldname: 'first_name',
						fieldtype: 'Data',
						reqd: true,
					},
					{
						label: 'Last Name',
						fieldname: 'last_name',
						fieldtype: 'Data',
						reqd: true,
					},
					{
						label: 'User Remark',
						fieldname: 'user_remark',
						fieldtype: 'Long Text'
					}
				],
				size: 'large', // small, large, extra-large 
				primary_action_label: 'Submit',
				primary_action(values) {
				console.log(values);
				frappe.call({
    			method: 'amazing_app.utils.make_vip_customer_via_dialog',
				args: {
					first_name: values.first_name,
					last_name: values.last_name,
					user_remark: values.user_remark
				},
				// disable the button until the request is completed
				btn: $('.primary-action'),
				// freeze the screen until the request is completed
				freeze: true,
				callback: (r) => {
					// on success
		
				},
				error: (r) => {
					// on error
				}
			})
					dialog.hide();
				}
			});
			dialog.show();

		})
	}
});