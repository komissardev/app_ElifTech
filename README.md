# Принцип роботи програми app_ElifTech
* Додаток запускається через термінал node командою: npm instal -> npm instal cors -> npm start потім треба запустити ./public/index.html
* хост - localhost, порт - 3000

> Вигляд об'єкта *JSON*:
```[{shopName: "", shopId: "", shopMenu: [{name:"Big Big Burger", productId: 0, price: 10, currency: "USD", imgUrl: "https://.jpg "},...]},{}..]```
де *shopName* - назва Магазину, тип даних *string*
де *shopId* - *id* магазину, тип даних *string*
де *shopMenu* - масив, що містить усі товари магазину у вигляді об'єктів
>> *name* - найменування товару, тип даних *string*
*productId* - *id* товару, тип даних *number*
*price* - ціна товару, тип даних *number*
*currency* - валюта ціни товару, тип даних *string*
*imgUrl* - *url* адреса на картину товару, тип даних *string*
**!Важливо дотримуватися структури ведучого об'єкта *JSON*!**

***

> Кінцевий результат замовлення можна переглянути http://localhost:3000/api/carts
>> Решту інформації ви можете знайти в коментарях до коду

**[Мій LinkedIn:](https://www.linkedin.com/in/viktor-komissarov-66269b252/)**
