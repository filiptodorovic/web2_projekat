using backendShop.Models;

namespace backendShop.DTO
{
    public enum SellerApprovalActions {APPROVE,DENY };
    public class SellerDTO
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public VerificationStatus VerificationStatus { get; set; }
    }
}
