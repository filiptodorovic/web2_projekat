﻿using backendShop.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace backendShop.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Buyer> Buyers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderItems { get; set; }
        public DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                 .HasKey(u => u.Email); // Define Email as primary key for User

            modelBuilder.Entity<Seller>()
                .ToTable("Sellers") // Configure table name for Seller
                .HasBaseType<User>(); // Configure inheritance relationship

            modelBuilder.Entity<Buyer>()
                .ToTable("Buyers") // Configure table name for Buyer
                .HasBaseType<User>(); // Configure inheritance relationship

            modelBuilder.Entity<Admin>()
                .ToTable("Admins") // Configure table name for Admin
                .HasBaseType<User>(); // Configure inheritance relationship

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Seller)
                .WithMany(s => s.Products)
                .HasForeignKey(p => p.SellerEmail);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Buyer)
                .WithMany(b => b.Orders)
                .HasForeignKey(o => o.BuyerEmail);

            modelBuilder.Entity<OrderProduct>()
                .HasKey(op => new { op.OrderId, op.ProductId }); // Composite primary key

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Product)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(op => op.ProductId);


            base.OnModelCreating(modelBuilder);
        }

    }
}
