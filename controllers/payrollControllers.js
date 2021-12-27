const fs = require('fs')
const json_payroll = fs.readFileSync('Payroll.json');

const PayrollControllers ={
    getPayroll:async(req,res)=>{
        try {
            let payroll = JSON.parse(json_payroll)
            res.json({success: true, res:payroll})
        }catch (err){
            res.json({success:false, res: err.message})
        }
    }
}
module.exports = PayrollControllers