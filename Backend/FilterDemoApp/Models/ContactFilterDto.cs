using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace FilterDemoApp.Models
{
    public class ContactFilterDto
    {

        [JsonProperty("sort")] public string Sort { get; set; }
        [JsonProperty("page")] public int? Page { get; set; }
        [JsonProperty("pageSize")] public int? PageSize { get; set; }
        [JsonProperty("name")] public string Name { get; set; }
        [JsonProperty("address")] public string Address { get; set; }
        [JsonProperty("city")] public string City { get; set; }
        [JsonProperty("date")] public DateTimeOffset Date { get; set; }

    }
}
