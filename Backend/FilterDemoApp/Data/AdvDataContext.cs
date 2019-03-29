using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilterDemoApp.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace FilterDemoApp.Data
{
    public class AdvDataContext : DbContext
    {

        public DbSet<ContactInfoEntity> Contacts { get; set; }

        public AdvDataContext(DbContextOptions<AdvDataContext> options)
            : base(options)
        {
        }

    }
}
