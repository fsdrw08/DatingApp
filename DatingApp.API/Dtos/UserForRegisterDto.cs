using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        [StringLength(20, MinimumLength = 8)]
        //[RegularExpression(((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]))]
        public string Password { get; set; }
    }
}