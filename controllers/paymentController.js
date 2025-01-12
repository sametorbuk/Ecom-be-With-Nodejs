const iyzipay = require("../config/iyzico");
const Iyzipay = require("iyzipay");

const createPayment = (req, res) => {
  const { price, paidPrice, buyerName, buyerEmail, buyerPhone } = req.body;

  const paymentRequest = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: "123456789",
    price: price,
    paidPrice: paidPrice,
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: "B67832",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardHolderName: buyerName,
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0",
    },
    buyer: {
      id: "BY789",
      name: buyerName,
      surname: "Soyadı",
      gsmNumber: buyerPhone,
      email: buyerEmail,
      identityNumber: "74300864791",
      lastLoginDate: "2023-01-01 12:00:00",
      registrationDate: "2023-01-01 12:00:00",
      registrationAddress: "Istanbul",
      ip: req.ip,
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: buyerName,
      city: "Istanbul",
      country: "Turkey",
      address: "Kadıköy",
      zipCode: "34742",
    },
    billingAddress: {
      contactName: buyerName,
      city: "Istanbul",
      country: "Turkey",
      address: "Kadıköy",
      zipCode: "34742",
    },
    basketItems: [
      {
        id: "BI101",
        name: "Ürün 1",
        category1: "Elektronik",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "50",
      },
      {
        id: "BI102",
        name: "Ürün 2",
        category1: "Elektronik",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: "50",
      },
    ],
  };

  iyzipay.payment.create(paymentRequest, (err, result) => {
    if (err) {
      console.error("Ödeme hatası:", err);
      return res
        .status(500)
        .json({ error: "Ödeme işlemi sırasında hata oluştu." });
    }

    try {
      const response = typeof result === "string" ? JSON.parse(result) : result;
      console.log("Ödeme Yanıtı:", response);
      res.status(200).json(response);
    } catch (parseError) {
      console.error("Yanıt çözümleme hatası:", parseError);
      res.status(500).json({ error: "Yanıt çözümleme hatası." });
    }
  });
};

module.exports = { createPayment };
