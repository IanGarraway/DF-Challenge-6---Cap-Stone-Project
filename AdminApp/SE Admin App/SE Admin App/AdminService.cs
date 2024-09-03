using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;



namespace SE_Admin_App
{

    public static class AdminService 
    {
        
        static CookieContainer _cookieContainer = new CookieContainer();
        static HttpClientHandler _handler = new HttpClientHandler() { CookieContainer = _cookieContainer };
        static HttpClient _client = new HttpClient(_handler);

        
        //internal override methods for testing
        public static void ConfigureForTesting(HttpClient client, CookieContainer cookieContainer)
        {
            _client = client;
            _cookieContainer = cookieContainer;
        }

        public static async Task<HttpResponseMessage> Login (string username, string password)
        {
            var userDets = new { username = username, password = password };
            // Serialize the object to JSON using System.Text.Json
            string jsonData = JsonSerializer.Serialize(userDets);

            // Prepare the content for the request
            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");            
            try
            {

                HttpResponseMessage response = await _client.PostAsync("http://127.0.0.1:4000/auth/login",
                    content);

                return response;
            }
            catch (HttpRequestException e)
            {
                throw new Exception("Error connecting to server.", e);
            }

        }

        public static IEnumerable<Cookie> GetCookies(Uri uri)
        {            
            return _cookieContainer.GetCookies(uri).Cast<Cookie>();
        }
    }
}
