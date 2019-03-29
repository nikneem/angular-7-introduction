using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FilterDemoApp.Data;
using FilterDemoApp.Data.Entities;
using FilterDemoApp.Models;
using LinqKit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilterDemoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactInfoController : ControllerBase
    {
        private readonly AdvDataContext _dbContext;

        public ContactInfoController(AdvDataContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ContactFilterDto filter)
        {
            try
            {
                var pageSize = filter.PageSize ?? 10;
                var skip = 0;
                if (filter.Page.HasValue && filter.Page.Value > 1)
                {
                    skip = (filter.Page.Value - 1) * pageSize;
                }
                var predicate = BuildFilter(filter);
                var filterExpression = predicate.Expand();
                var entities = await _dbContext.Contacts
                    .Where(filterExpression)
                    .OrderBy(fld => fld.LastName)
                    .Skip(skip)
                    .Take(pageSize)
                    .ToListAsync();

                var models = entities.Select(ent => new ContactDto
                {
                    BusinessEntityID =  ent.BusinessEntityID,
                    Street = ent.Street,
                    LastName =  ent.LastName,
                    City =  ent.City,
                    CountryRegion = ent.CountryRegion,
                    EMailAddress =  ent.EMailAddress,
                    FirstName =  ent.FirstName,
                    MiddleName =  ent.MiddleName,
                    ModifiedDate = ent.ModifiedDate,
                    PostalCode = ent.PostalCode,
                    StateProvince =  ent.StateProvince,
                    TelephoneNumber = ent.TelephoneNumber
                });
                return Ok(models);


            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        public static Expression<Func<ContactInfoEntity, bool>> BuildFilter(ContactFilterDto filter)
        {
            var predicate = PredicateBuilder.New<ContactInfoEntity>()
                .And(x => x.BusinessEntityID > 0);

            if (!string.IsNullOrWhiteSpace(filter.Address))
            {
                var addressFilter = PredicateBuilder.New<ContactInfoEntity>()
                    .Or(x => x.Street.Contains(filter.Address))
                    .Or(x => x.City.Contains(filter.Address))
                    .Or(x => x.CountryRegion.Contains(filter.Address))
                    .Or(x => x.PostalCode.Contains(filter.Address));
                predicate = predicate.And(addressFilter);
            }
            if (!string.IsNullOrWhiteSpace(filter.City))
            {
                predicate = predicate.And(flt => flt.City.Contains(filter.Address));
            }
            if (!string.IsNullOrWhiteSpace(filter.Name))
            {
                var nameFilter = PredicateBuilder.New<ContactInfoEntity>()
                    .Or(x => x.FirstName.Contains(filter.Name))
                    .Or(x => x.LastName.Contains(filter.Name))
                    .Or(x => x.MiddleName.Contains(filter.Name));
                predicate = predicate.And(nameFilter);
            }
            if (filter.DateFrom.HasValue)
            {
                var date = filter.DateFrom.Value.LocalDateTime;
                predicate = predicate.And(ent => ent.ModifiedDate >= date);
            }
            if (filter.DateTo.HasValue)
            {
                var date = filter.DateTo.Value.LocalDateTime.AddDays(1);
                predicate = predicate.And(ent => ent.ModifiedDate < date);
            }

            return predicate;

        }

    }
}