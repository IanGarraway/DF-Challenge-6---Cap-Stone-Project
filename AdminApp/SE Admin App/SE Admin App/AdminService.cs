using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SE_Admin_App
{
    internal static class AdminService
    {
        static HttpClient client = new HttpClient();
        static CookieContainer cookieContainer = new CookieContainer();
        static HttpClientHandler handler = new HttpClientHandler() { CookieContainer = cookieContainer };

        public static async Task<HttpResponseMessage> Login (string username, string password)
        {
            var userDets = new { username = username, password = password };
            // Serialize the object to JSON using System.Text.Json
            string jsonData = JsonSerializer.Serialize(userDets);

            // Prepare the content for the request
            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");            
            try
            {

                HttpResponseMessage response = await client.PostAsync("http://127.0.0.1:4000/auth/login",
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
            return cookieContainer.GetCookies(uri).Cast<Cookie>();
        }
    }
}
