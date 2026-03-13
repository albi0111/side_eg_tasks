# BikeShop Application Solution

## Design Decisions and Assumptions
1. **Database Selection**: Elected to use SQLite (`Microsoft.EntityFrameworkCore.Sqlite`) for the backend database as it does not require installing any external database servers, ensuring the reviewer can run it out of the box.
2. **EF Core Initialization**: Added `context.Database.EnsureCreated()` and seeded the initial JSON data programmatically in `OnModelCreating`. This means the reviewer doesn't have to manually run Entity Framework migrations.
3. **Frontend Scaffolding**: Structured the `CreateBike` and `BikeDetails` pages as lazy-loaded Angular Modules to follow the pattern established in the existing template (`home` and `my-favourites`), and to ensure proper separation of concerns.
4. **CORS Policy**: Configured the .NET API to explicitly allow `http://localhost:4200` to prevent CORS issues when communicating between the locally running Angular dev server and the Backend.

## Improvements with More Time
- **Validation**: Implement proper `FluentValidation` in the API pipeline, and use Angular Reactive Forms inside `CreateBike` with comprehensive client-side custom validators rather than basic template-driven structures.
- **Error Handling**: Implement an ASP.NET Core Global Exception Handler (`ExceptionHandlerMiddleware`) and a consistent error envelope for API-side responses. In Angular, implement an `HttpInterceptor` to globally catch API errors and display toast notifications.
- **Unit Testing**: Add `xUnit` tests for the `.NET API` controllers (by mocking `DbContext` or using In-Memory Database provider) and `Jasmine/Karma` unit tests for the newly added Angular components (`BikeDetailsComponent`, `CreateBikeComponent`).
- **State Management**: If the application grows larger, implement a state library like NgRx or use Angular Signals to inherently manage the `My Favourites` list across components reactively instead of manually syncing `localStorage` and `UI state` in multiple places.
- **Authentication**: Add JWT-based authentication on the API to secure the endpoints, and an authorization interceptor on the UI side.
