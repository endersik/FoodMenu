using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MenuApi.Models
{
    public class FoodItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Category { get; set; }
        public double Price { get; set; }
    }
}