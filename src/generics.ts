// interface IName {name:string};

// class Collection <T extends IName> {
//     private items: T[] = [];

//     public add( item:T): void {
//         this.items.push(item)
//     }

//     public get(name:string): T | undefined {
//        return this.items.find(item => item.name ===name)
//     }
// };

// class User implements IName {
//     constructor( readonly name:string) {}
// };

// class Admin {};

// const userCollections: Collection<User> = new Collection();
// userCollections.add(new User('John'));
// userCollections.add(new User('Ann'));

// const user = userCollections.get('John');
// const adminCollection: Collection<Admin> = new Collection(); //Error Type 'Admin' does not satisfy the constraint 'IName'

/*

Intro:

    Our frontend application needs to fetch some data from an api.

    The server API format was decided to be the following:

    In case of success: { status: 'success', data: RESPONSE_DATA }
    In case of error: { status: 'error', error: ERROR_MESSAGE }

    The types UsersApiResponse and ProductApiResponse were already
    created. But, we figured out that the number of types needed to 
    be created is too big if new data types were required.

Exercise:

    1. Remove the UsersApiResponse and ProductsApiResponse types and use the generic ApiResponse type to specify a generic API response format for each function. 
    2. Constraint the generic type to be a subtype of Entity.
    3. (Bonus) Create a generic fetchMock() function to minimize 
       the code of the fetchProducts() and fetchUsers() functions.

*/
//==========
// interface Entity {
//     id: string;
// }

// interface User extends Entity {
//     name: string;
// }

// interface Product extends Entity {
//     description: string;
// }

// const mockUsers: User[] = [
//     { id: "1", name: 'Santa Claus' },
//     { id: "2", name: 'Jon Doe' }
// ];
// const mockProducts: Product[] = [
//     { id: "1", description: 'Product 1' },
//     { id: "2", description: 'Product 2' }
// ];


// type UsersApiResponse = (
//     {
//         status: 'success';
//         data: User[];
//     } |
//     {
//         status: 'error';
//         error: string;
//     }
// );

// type ProductsApiResponse = (
//     {
//         status: 'success';
//         data: Product[];
//     } |
//     {
//         status: 'error';
//         error: string;
//     }
// );

// async function fetchProducts(): Promise<ApiResponse<Product>> {
//     return new Promise(res => res({
//         status: 'success',
//         data: mockProducts
//     }));
// }
// async function fetchUsers(): Promise<ApiResponse<User>> {
//     return new Promise(res => res({
//         status: 'success',
//         data: mockUsers
//     }));
// }

// async function startApp() {
//     const usersResponse = await fetchUsers();
//     const productsResponse = await fetchProducts();
    
//     if (usersResponse.status === 'error' || productsResponse.status === 'error') {
//         throw new Error('An error occured while fetching some data.')
//     }   

//     console.log(`Successfully fetched ${usersResponse.data.length} users.`);
//     console.log(`Successfully fetched ${productsResponse.data.length} products.`);

// }

//ANSWER 
// type ApiResponse <T extends Entity> = (  {
//         status: 'success';
//         data: T[];
//     } |
//     {
//         status: 'error';
//         error: string;
//     })

// async function fetchMock <T extends Entity> (mockData: T[]): Promise<ApiResponse<T>> {
//      return new Promise(res => res({
//         status: 'success',
//         data: mockData
//     }));
// }

// async function startApp() {
//     const usersResponse = await fetchMock<User>(mockUsers);
//     const productsResponse = await fetchMock<Product>(mockProducts);
    
//     if (usersResponse.status === 'error' || productsResponse.status === 'error') {
//         throw new Error('An error occured while fetching some data.')
//     }   

//     console.log(`Successfully fetched ${usersResponse.data.length} users.`);
//     console.log(`Successfully fetched ${productsResponse.data.length} products.`);

// }

// startApp();

//==========
 
//  function marge <T extends object, U extends object> (objA:T, objB:U) {
//     return Object.assign({}, objA, objB)
//  }

//  const toMerge1= {
//     name:'Max'
//  };
//  const toMerge2= {
//     age:21 
// };

// const merged = marge(toMerge1,toMerge2)

//==========

// interface ILengh {
//     length:number
// };

// function getLength <T extends ILengh> (str:T): number{
//     return str.length
// }

// const obj = {
//     length:10
// };

// getLength('10');
// getLength(10);//err
// getLength(obj);

//==========



// function extractValue<T extends object, U extends keyof T >(obj:T, key:U){
//     return obj[key]
// }
// const field = extractValue({name:'Max'}, 'name');
// const field1 = extractValue({name:'Max'}, 'age');// Err

