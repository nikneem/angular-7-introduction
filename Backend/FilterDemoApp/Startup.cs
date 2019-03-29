using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FilterDemoApp.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FilterDemoApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        readonly string defaultCorsPolicyName = "allow_specific_origins";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = "DATA SOURCE=(local);INITIAL CATALOG=AdventureWorks2017;INTEGRATED SECURITY=True;";
            services.AddEntityFrameworkSqlServer()
                .AddDbContext<AdvDataContext>((serviceProvider, options) =>
                    options.UseSqlServer(connectionString)
                        .UseInternalServiceProvider(serviceProvider)
                );

            services.AddCors(options =>
            {
                options.AddPolicy(defaultCorsPolicyName,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200")
                            .WithHeaders("Content-Type", "Authorization", "Accept")
                            .WithMethods("OPTIONS", "TRACE", "GET", "HEAD", "POST", "PUT")
                            .WithExposedHeaders("X-Pagination");
                    });
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors(defaultCorsPolicyName);
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
