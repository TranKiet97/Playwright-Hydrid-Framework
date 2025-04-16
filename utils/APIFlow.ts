import { APIRequestContext } from "@playwright/test";

class APIFlow {
    private apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }
 
    async getToken(loginPayLoad: any) {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: loginPayLoad
        });
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }
 
    async createOrder(orderPayLoad: any, token: any) {
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });         
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
 
        return orderResponseJson.orders[0];
    }
}
 
export { APIFlow };