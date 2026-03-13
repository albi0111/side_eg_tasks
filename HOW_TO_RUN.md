# BikeShop Application - Setup and Architecture

## Prerequisites
To run this application, you need the following tools installed on your system. These tools are cross-platform and support **Windows, macOS, and Linux**.

1. **Node.js**: Required to build and run the Angular frontend.
   - Download the LTS version for your OS from the [official Node.js website](https://nodejs.org/). `npm` is included automatically.
2. **.NET 9 SDK**: Required to build and run the C# ASP.NET Core backend API.
   - Download the .NET 9 SDK for your OS (Windows, macOS, or Linux) from the [official Microsoft .NET website](https://dotnet.microsoft.com/download/dotnet/9.0).

## How to Run the Application

The application consists of two separate projects that need to be run simultaneously. You can use your preferred terminal app (Command Prompt or PowerShell for Windows, Terminal for macOS/Linux, or your IDE's integrated terminal).

### 1. Running the Backend API Server (.NET)
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd "BikeShop.API"
   ```
2. Build and run the `.NET` project:
   ```bash
   dotnet run
   ```
3. The API will start and listen for requests on **http://localhost:5111**.
   *(Note: The SQLite database compiles and seeds initial bike data automatically on startup. No manual database setup or migration is needed on any OS.)*

### 2. Running the Frontend UI (Angular)
1. Open a new, separate terminal window/tab and navigate to the frontend directory:
   ```bash
   cd "BikeShop.UI"
   ```
2. Install the necessary node dependencies (only required the first time):
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   npm start
   ```
4. Once compiled, the frontend interface will be available at **http://localhost:4200**. Open this URL in your web browser.

### 3. How to Stop the Application
To stop either the Backend API or the Frontend UI server:
1. Go to the terminal window where the server is running.
2. Press `Ctrl + C` on your keyboard (applies to Windows, macOS, and Linux).
3. The server will gracefully shut down and return you to the terminal prompt.

---

## Code Explanation & Architecture

This application follows a standard client-server architecture, completely separating the presentation layer from the data and business logic.

### Backend (`BikeShop.API`)
- **Framework**: Built with ASP.NET Core (.NET 9).
- **Database**: Uses **SQLite** via Entity Framework Core (EF Core). This is a lightweight database that stores data in a local file (`bikes.db`), making the project highly portable for testing without needing complex SQL servers installed.
- **Initialization**: Inside the application startup cycle, it is configured to call `Database.EnsureCreated()`. When the app runs for the very first time, it automatically creates the SQLite database file and seeds it with the initial JSON bike catalogue data, ensuring zero manual database setup.
- **CORS Configuration**: Cross-Origin Resource Sharing is explicitly configured in `Program.cs` to allow requests from `http://localhost:4200` (the Angular app) so the frontend client can fetch data securely without browser policy blocks.
- **Controllers & Routing**: The API exposes RESTful controller endpoints (`GET /api/bikes`, `POST /api/bikes`, `GET /api/bikes/{id}`) that interact directly with the Entity Framework context to query and update the database structure.

### Frontend (`BikeShop.UI`)
- **Framework & Structure**: Built with Angular 17. The project breaks pages into dedicated standalone or modular components (e.g., `HomeComponent`, `CreateBikeComponent`, `MyFavouritesComponent` and `BikeDetailsComponent`) for separation of concerns and component reusability (like the `ItemComponent` used to display individual bike cards).
- **Routing**: The application uses the Angular Router to navigate seamlessly between different views dynamically without reloading the entire application page.
- **API Integration**: `BikeService` is an injectable Angular service that uses the `HttpClient` module to communicate asynchronously with the .NET backend API over HTTP for fetching lists, creating records, and retrieving specific bike details.
- **State Management (Favourites)**: The 'Add to Favourites' feature relies on the client browser's `localStorage` API. When a user favourites a bike, its unique `ref` ID is saved as a JSON array string in the local storage (`favouriteBikes`). When components like `HomeComponent` and `BikeDetailsComponent` initialize (`ngOnInit`), they immediately check this storage to visually update the UI (setting `inFavourites = true` where applicable), ensuring the user's favourite state persists even after a page refresh or browser restart.
- **Image Uploading**: The 'Create Bike' form utilizes the HTML5 `FileReader` API. When a user selects an image from their local machine, it is instantly read and converted into a `Base64` Data URL string. This string acts as the image "URL", and is sent to the backend database as text to be stored and subsequently rendered back dynamically.



## Explanation of how the communication happens and the files responsible for it.

There are three main files involved in this communication:


BikeShop.UI/src/app/bike.service.ts
 (Frontend HTTP Client)

BikeShop.API/Controllers/BikesController.cs
 (Backend API Endpoints)

BikeShop.API/Program.cs
 (Backend CORS Configuration)


1. The Frontend Client (bike.service.ts)
This Angular service is responsible for initiating communication with the backend. It uses Angular's built-in HttpClient to send HTTP requests to the .NET API.
```
export class BikeService {
  // Base URL pointing to the backend API
  private apiUrl = 'http://localhost:5111/api/bikes';

  constructor(private http: HttpClient) { }

  // Fetches all bikes (HTTP GET)
  list(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetches a specific bike by ID (HTTP GET)
  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Submits a new bike to the backend (HTTP POST)
  create(bike: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bike);
  }
}
```

2. The Backend Endpoints (BikesController.cs)
This .NET controller listens for the HTTP requests sent by the frontend, interacts with the SQLite database via Entity Framework, and returns the appropriate data or success status.

The [Route("api/[controller]")] attribute maps this entire class to http://localhost:5111/api/bikes (since the class is named BikesController).

```
[ApiController]
[Route("api/[controller]")]
public class BikesController : ControllerBase
{
    // ... Database context setup hidden for brevity ...
    
    // Corresponds to the frontend's list() method
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Bike>>> GetBikes()
    {
        return await _context.Bikes.ToListAsync();
    }

    // Corresponds to the frontend's getById() method
    [HttpGet("{id}")]
    public async Task<ActionResult<Bike>> GetBike(Guid id)
    {
        var bike = await _context.Bikes.FindAsync(id);
        return bike == null ? NotFound() : bike;
    }

    // Corresponds to the frontend's create() method
    [HttpPost]
    public async Task<ActionResult<Bike>> PostBike(Bike bike)
    {
        // Generates a new ID and saves the bike data sent from the Angular app
        if (bike.Ref == Guid.Empty)
        {
            bike.Ref = Guid.NewGuid();
        }
        _context.Bikes.Add(bike);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetBike), new { id = bike.Ref }, bike);
    }
}

```

3. The Backend CORS Configuration (Program.cs)
For security reasons, web browsers block frontend applications (running on http://localhost:4200) from making API calls to a server on a different port (http://localhost:5111) by default.

To make the communication possible, the backend must explicitly tell the browser that the Angular app is allowed to communicate with it. This is done by configuring CORS (Cross-Origin Resource Sharing) in 

Program.cs:

```
   // 1. Defining the CORS Policy:
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder =>
        {
            // Specifically allows requests originating from the Angular frontend
            builder.WithOrigins("http://localhost:4200") 
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// ... further down in the file ...

// 2. Applying the CORS Policy to the incoming HTTP request pipeline:
app.UseCors("AllowAngularApp");

```

Summary of the Flow:
When a user creates a new bike or views the bikes list, the Angular app calls a method in BikeService.

BikeService sends an HTTP Request (e.g., GET or POST) to http://localhost:5111/api/bikes.
The browser checks the backend's CORS policy (Program.cs) to ensure the request is allowed.
The request reaches BikesController.cs on the backend, which executes the corresponding C# method (GetBikes or PostBike).
The backend returns a response (Data or a Status Code) back to the frontend to update the UI components.