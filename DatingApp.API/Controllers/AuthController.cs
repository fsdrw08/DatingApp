using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegister)
        {
            //validate

            string username = userForRegister.Username.ToLower();

            if (await _repo.UserExit(username))
                return BadRequest("use other name");

            var userToCreate = new User
            {
                Username = username
            };

            var createdUser = await _repo.Register(userToCreate, userForRegister.Password);

            return StatusCode(201);
        }
    }
}