const iyzipay = require("../config/iyzico");

const createPayment = (req, res) => {
  const { price, paidPrice, buyerName, buyerEmail, buyerPhone } = req.body;

  const request = {
    locale: "tr",
    conversationId: "123456789",
    price: price,
    paidPrice: paidPrice,
    currency: "TRY",
    installment: "1",
    basketId: "B67832",
    paymentChannel: "WEB",
    paymentGroup: "PRODUCT",
    paymentCard: {
      cardHolderName: "Test Kullanıcı",
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
      identityNumber: "11111111111",
      lastLoginDate: "2023-01-01 12:00:00",
      registrationDate: "2022-01-01 12:00:00",
      registrationAddress: "İstanbul, Türkiye",
      ip: "85.34.78.112",
      city: "İstanbul",
      country: "Türkiye",
      zipCode: "34000",
    },
    basketItems: [
      {
        id: "BI101",
        name: "Ürün 1",
        category1: "Elektronik",
        itemType: "PHYSICAL",
        price: price,
      },
    ],
  };

  iyzipay.payment.create(request, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(JSON.parse(result));
  });
};

module.exports = { createPayment };
