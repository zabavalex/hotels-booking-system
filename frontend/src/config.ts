/**
 * Конфигурация приложения.
 *
 * Для переопределении значений в production-сборке добавить в выходной после сборки файл
 * build/config.js по примеру build/config.example.js требуемые для перезаписи значения
 * (указывать только значения отличные от значений в текущем файле)
 */
export class Config {
  // Префикс для API запросов
  apiPrefix = process.env.REACT_APP_API_PREFIX;

  SESSION_EXPIRED_CODE = 100;

  // Внутренние роуты приложения
  routes = {
    loginPage: '/login',
    mainPage: '/main',
    hotelsPage: '/hotel',
    bookingsPage: '/booking',
  };

  // Пути для API запросов
  get apiMethods(): { [key: string]: string } {
    const sessionServiceApiPrefix = "http://localhost:8090"
    const gateAwayServiceApiPrefix = "http://localhost:8093"

    return {
      gateAwayServiceApiPrefix: "http://localhost:8093",
      // Auth
      verify: `${sessionServiceApiPrefix}/verify`,
      login: `${sessionServiceApiPrefix}/login`,
      registration: `${sessionServiceApiPrefix}/user/create`,

      // Hotel
      getHotels:  `${gateAwayServiceApiPrefix}/hotels/getallbyfilter`,
      getAllHotels:  `${gateAwayServiceApiPrefix}/hotels/getall`,
      getHotel: `${gateAwayServiceApiPrefix}/hotels/`,
      createHotel: `${gateAwayServiceApiPrefix}/hotels/`,

      // Booking
      bookingCreate : `${gateAwayServiceApiPrefix}/booking/create`,
      getAllByClientId: `${gateAwayServiceApiPrefix}/booking/`,
      getBookingDetails: `${gateAwayServiceApiPrefix}/booking/`,
      bookingDelete: `${gateAwayServiceApiPrefix}/booking/`,

      // Payment
      pay : `${gateAwayServiceApiPrefix}/payment/create`,

      // Contact
      getContacts: `${gateAwayServiceApiPrefix}/getContacts`,

      // Inventory
      downloadInventoryList: `${gateAwayServiceApiPrefix}/inventory/downloadXlsx`,
      getInventoryList: `${gateAwayServiceApiPrefix}/inventory/getInventoryList.do`,

      // Merchant
      availableMerchants: `${gateAwayServiceApiPrefix}/merchant/availableMerchants.do`,
      merchantTransactionStatistics: `${gateAwayServiceApiPrefix}/merchant/merchantTransactionStatistics.do`,

      // Transaction
      downloadTransactionList: `${gateAwayServiceApiPrefix}/transaction/downloadXlsx`,
      legalEntityTransactions: `${gateAwayServiceApiPrefix}/transaction/legalEntityTransactions.do`,
      transactionDetails: `${gateAwayServiceApiPrefix}/transaction/transactionDetails.do`,
      refundTransaction: `${gateAwayServiceApiPrefix}/transaction/refund.do`,
      reversalTransaction: `${gateAwayServiceApiPrefix}/transaction/reversal.do`,
    };
  }

  /**
   * Расширить параметры конфигурации
   * @param newConfigParams
   */
  extendConfig(newConfigParams: Record<string, unknown>): void {
    Object.assign(this, newConfigParams);
  }
}

const config = new Config();

export default config;
