using backendShop.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;

namespace backendShop.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            ConfigureUsers(modelBuilder);
            ConfigureProducts(modelBuilder);
            ConfigureOrders(modelBuilder);
            ConfigureOrderProduct(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }

        #region ModelConfiguration
        private void ConfigureUsers(ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>()
                    .Property(u => u.UserId)
                    .ValueGeneratedOnAdd();

            modelBuilder.Entity<User>()
                     .HasKey(u => u.UserId);

            modelBuilder.Entity<User>()
                  .HasIndex(p => p.Email)
                  .IsUnique();
            modelBuilder.Entity<User>()
                  .HasIndex(p => p.Username)
                  .IsUnique();
            modelBuilder.Entity<User>()
                  .Property(p => p.Name)
                  .IsRequired().HasMaxLength(50);
            modelBuilder.Entity<User>()
                  .Property(p => p.LastName)
                  .IsRequired().HasMaxLength(50);
            modelBuilder.Entity<User>()
                  .Property(p => p.Password)
                  .IsRequired();
            modelBuilder.Entity<User>()
                  .Property(p => p.DateOfBirth)
                  .IsRequired();
            modelBuilder.Entity<User>()
                  .Property(p => p.Address)
                  .IsRequired();
            modelBuilder.Entity<User>()
                  .Property(p => p.UserType)
                  .HasConversion(new EnumToStringConverter<UserType>());
            modelBuilder.Entity<User>()
                  .Property(p => p.VerificationStatus)
                  .HasConversion(new EnumToStringConverter<VerificationStatus>());
        }


        public void ConfigureProducts(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Product>()
                .HasKey(p => p.ProductId);
            modelBuilder.Entity<Product>()
                  .Property(p => p.Name)
                  .IsRequired().HasMaxLength(50);
            modelBuilder.Entity<Product>()
                  .Property(p => p.Price)
                  .IsRequired();
            modelBuilder.Entity<Product>()
                  .Property(p => p.Amount)
                  .IsRequired();

            modelBuilder.Entity<Product>()
                .HasOne(p=>p.User)
                .WithMany(p => p.Products)
                .HasForeignKey(p=>p.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public void ConfigureOrders(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Order>()
                    .HasKey(p => p.OrderId);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(o => o.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict);

        }

        public void ConfigureOrderProduct(ModelBuilder modelBuilder) {
            modelBuilder.Entity<OrderProduct>()
                    .HasKey(op => new { op.OrderId, op.ProductId }); // Composite primary key

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(op => op.OrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Product)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(op => op.ProductId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

        }


        #endregion
    }
}
