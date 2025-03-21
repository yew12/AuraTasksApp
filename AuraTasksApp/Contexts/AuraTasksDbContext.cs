using AuraTasksApp.Models;
using Microsoft.EntityFrameworkCore;

namespace AuraTasksApp.Contexts
{
    public class AuraTasksDbContext : DbContext
    {
        /// <summary>
        /// Basically our table for tasks
        /// </summary>
        public DbSet<Tasks> Tasks { get; set; }

        public AuraTasksDbContext(DbContextOptions<AuraTasksDbContext> options) 
            : base(options)
        {}

    }
}