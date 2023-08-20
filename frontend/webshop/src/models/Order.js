export default class Order {
  constructor(orderId, timeOrdered, comment, address, totalCost, userId, orderItems) {
    this.orderId = orderId;
    this.timeOrdered = timeOrdered;
    this.comment = comment;
    this.address = address;
    this.totalCost = totalCost;
    this.userId = userId;
    this.orderItems = orderItems || []; // Initialize with an empty array if not provided
  }
}