import React, { useState, useContext } from 'react';
import { Send, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { performTransfer } from '../../utils/apiServices';
import { LanguageContext } from '../../context/LanguageContext';

export default function MoneyTransfer() {
    const { t } = useContext(LanguageContext);
    const [formData, setFormData] = useState({
        beneficiaryName: '',
        accountNumber: '',
        confirmAccountNumber: '',
        ifscCode: '',
        amount: '',
        remark: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const quickAmounts = [500, 1000, 2000, 5000];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errorMsg) setErrorMsg(''); // clear error when typing
    };

    const handleQuickAmount = (amount) => {
        setFormData({ ...formData, amount: String(amount) });
        if (errorMsg) setErrorMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.accountNumber !== formData.confirmAccountNumber) {
            setErrorMsg('Account numbers do not match. Please verify carefully.');
            return;
        }
        if (!formData.amount || Number(formData.amount) <= 0) {
            setErrorMsg('Please enter a valid transfer amount.');
            return;
        }
        if (formData.ifscCode.length < 5) {
            setErrorMsg('Please enter a valid IFSC code.');
            return;
        }

        setErrorMsg('');
        setIsSubmitting(true);

        try {
            const response = await performTransfer({
                accountNumber: formData.accountNumber,
                ifscCode: formData.ifscCode,
                amount: formData.amount,
                remark: formData.remark
            });

            if (response.ok && response.data.success) {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setFormData({
                        beneficiaryName: '',
                        accountNumber: '',
                        confirmAccountNumber: '',
                        ifscCode: '',
                        amount: '',
                        remark: ''
                    });
                }, 4000);
            } else {
                setErrorMsg(response.data.message || 'Transfer failed. Please try again.');
            }
        } catch (error) {
            setErrorMsg('Network error. Please make sure the server is connected.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 md:bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-3xl mx-auto">

                {showSuccess && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="p-2 bg-emerald-100 rounded-full text-emerald-600 flex-shrink-0">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-emerald-800 font-semibold text-lg">{t("transfer_success")}</h3>
                            <p className="text-emerald-600 font-medium text-sm mt-0.5">{t("transfer_success_msg")}</p>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Top Banner / Trust Indicator */}
                    <div className="bg-[linear-gradient(90deg,#1e3a7b_0%,#152d68_50%,#0f1f4d_100%)] p-6 sm:p-8 text-white relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
                            <ShieldCheck className="w-48 h-48" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <ShieldCheck className="w-5 h-5 text-violet-200" />
                                <span className="text-violet-200 font-medium text-sm tracking-wide uppercase">{t("money_transfer")}</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                        {errorMsg && (
                            <div className="mb-6 p-3.5 bg-red-50 text-red-600 border border-red-200 rounded-xl flex items-center gap-3 text-sm font-medium animate-in fade-in duration-300">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p>{errorMsg}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Left Column: Beneficiary Details */}
                            <div className="space-y-5">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1">{t("beneficiary_details")}</h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 pl-1">{t("acc_holder_name")}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">

                                        </div>
                                        <input
                                            type="text"
                                            name="beneficiaryName"
                                            required
                                            value={formData.beneficiaryName}
                                            onChange={handleChange}
                                            placeholder="e.g. John Doe"
                                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 pl-1">{t("account_number")}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        </div>
                                        <input
                                            type="password" /* password type protects peeking initially */
                                            name="accountNumber"
                                            required
                                            value={formData.accountNumber}
                                            onChange={handleChange}
                                            placeholder="Enter Account Number"
                                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-mono tracking-widest"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 pl-1">{t("confirm_acc_number")}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        </div>
                                        <input
                                            type="text"
                                            name="confirmAccountNumber"
                                            required
                                            value={formData.confirmAccountNumber}
                                            onChange={handleChange}
                                            placeholder="Re-enter to confirm"
                                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-mono tracking-widest"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 pl-1">{t("ifsc_code")}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">

                                        </div>
                                        <input
                                            type="text"
                                            name="ifscCode"
                                            required
                                            value={formData.ifscCode}
                                            onChange={handleChange}
                                            placeholder="e.g. SBIN0001234"
                                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 uppercase placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 pl-1">{t("ifsc_note")}</p>
                                </div>
                            </div>

                            {/* Right Column: Transfer Details */}
                            <div className="space-y-5">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-1 mt-6 md:mt-0">{t("payment_details")}</h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 pl-1">{t("amount_to_transfer")}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-gray-500 font-semibold text-lg">₹</span>
                                        </div>
                                        <input
                                            type="number"
                                            name="amount"
                                            required
                                            min="1"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            placeholder="0.00"
                                            className="block w-full pl-9 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-xl font-bold placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    {/* Quick Select Amounts */}
                                    <div className="flex flex-wrap gap-2 mt-3 pl-1">
                                        {quickAmounts.map((amt) => (
                                            <button
                                                key={amt}
                                                type="button"
                                                onClick={() => handleQuickAmount(amt)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${formData.amount === String(amt)
                                                    ? 'bg-violet-100 text-violet-700 border-violet-200'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-violet-300 hover:text-violet-600'
                                                    }`}
                                            >
                                                +₹{amt.toLocaleString()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 pl-1">{t("remarks_optional")}</label>
                                    <input
                                        type="text"
                                        name="remark"
                                        value={formData.remark}
                                        onChange={handleChange}
                                        placeholder={t("what_is_this_for")}
                                        className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-600 font-semibold rounded-lg text-xs hover:bg-gray-300 active:scale-[0.98] transition-all"
                                onClick={() => setFormData({ beneficiaryName: '', accountNumber: '', confirmAccountNumber: '', ifscCode: '', amount: '', remark: '' })}
                            >
                                {t("clear_details")}
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-b from-[#1e3a7b] to-[#0f1f4d] text-white font-semibold rounded-lg text-xs active:scale-[0.98] transition-all disabled:opacity-50 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {t("processing")}
                                    </>
                                ) : (
                                    <>
                                        {t("transfer_securely")} <Send className="w-4 h-4 ml-1" />
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

                {/* Footer info */}
                <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t("secure_footer")}
                </p>
            </div>
        </div>
    );
}
