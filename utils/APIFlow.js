class APIFlow {
    constructor(apiContext) {
        this.apiContext = apiContext;
    }
 
    async getToken(loginPayLoad) {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: loginPayLoad
        });
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }
 
    async createOrder(orderPayLoad, token) {
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
 
        return orderResponseJson.orders[0];;
    }
}
 
export { APIFlow };