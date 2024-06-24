import bills from "../DB Models/Bills.js"
import tourist from "../DB Models/Tourists_Acc.js"

let G_pending 
let G_amount_cents
let G_success
let G_order
let G_created_at
let G_currency
let G_owner
export const index = async (req, res) => { 
    const data = req.query
    G_pending = data.pending
    G_amount_cents = data.amount_cents
    G_success = data.success
    G_order = data.order
    G_created_at = data.created_at
    G_currency = data.currency
    G_owner = data.owner
    res.redirect('http://localhost:5000/Done/bill')
};
export const bill = async (req, res) => { 
    const {trip_name} = req.cookies;
    const {id} = req.cookies;
    res.clearCookie('id');
    res.clearCookie('trip_name');
    
      await bills.create({
        user_id: id ,
        trip:trip_name ,
        pending:G_pending ,
        amount_cents:G_amount_cents ,
        success:G_success ,
        order:G_order ,
        created_at:G_created_at ,
        currency:G_currency ,
        owner : G_owner
    }); 
    const bill = await bills.findOne({user_id:id , trip : trip_name , created_at : G_created_at}).populate('user_id').lean();
    const amount = bill.amount_cents/100;
    res.render('Bill/bill' , {bill ,amount})
};
