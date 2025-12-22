class Product {
    
    private id: number;
    private name: string;
    private price: number;
    private description: string;
    private category: string;
    private stock: number;
    private createdAt: Date;
    private  updatedAt: Date;
    

    constructor(id: number, name: string, price: number, description: string, category: string, stock: number, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.stock = stock;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
    
    getPrice(): number {    
        return this.price;
    }

    getDescription(): string {      
        return this.description;
    }
    
    getCategory(): string {      
        return this.category;
    }
    
    getStock(): number {      
        return this.stock;
    }
    
    getCreatedAt(): Date {      
        return this.createdAt;
    }
    
    getUpdatedAt(): Date {      
        return this.updatedAt;
    }
    
    // Setters

    setName(name: string): void {
        this.name = name;
    }
    setPrice(price: number): void {    
        this.price = price;
    }
    setDescription(description: string): void {      
        this.description = description;
    }
    setCategory(category: string): void {      
        this.category = category;
    }
    setStock(stock: number): void {      
        this.stock = stock;
    }
    setUpdatedAt(updatedAt: Date): void {      
        this.updatedAt = updatedAt;
    }
    
    // Method to display product info
    displayInfo(): string {
        return `Product [ID: ${this.id}, Name: ${this.name}, Price: $${this.price.toFixed(2)}, Description: ${this.description}, Category: ${this.category}, Stock: ${this.stock}, Created At: ${this.createdAt.toISOString()}, Updated At: ${this.updatedAt.toISOString()}]`;
    }

    


}

export { Product };