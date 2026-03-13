using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BikeShop.API.Models
{
    public class Bike
    {
        [Key]
        [JsonPropertyName("ref")]
        public Guid Ref { get; set; }

        [JsonPropertyName("manufacturer")]
        public string Manufacturer { get; set; } = string.Empty;

        [JsonPropertyName("model")]
        public string Model { get; set; } = string.Empty;

        [JsonPropertyName("category")]
        public string Category { get; set; } = string.Empty;

        [JsonPropertyName("price")]
        public string Price { get; set; } = string.Empty;

        [JsonPropertyName("colour")]
        public string Colour { get; set; } = string.Empty;

        [JsonPropertyName("weight")]
        public string Weight { get; set; } = string.Empty;

        [JsonPropertyName("img_url")]
        public string ImgUrl { get; set; } = string.Empty;
    }
}
