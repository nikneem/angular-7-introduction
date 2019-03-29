using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FilterDemoApp.Data.Entities
{
    [Table("vAdditionalContactInfo", Schema = "Person")]
    public class ContactInfoEntity
    {

        [Key]
        public int BusinessEntityID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string TelephoneNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string StateProvince { get; set; }
        public string PostalCode { get; set; }
        public string CountryRegion { get; set; }
        public string EMailAddress { get; set; }
        public DateTime ModifiedDate { get; set; }

    }
}
