using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AuraTasksApp.Models;
using AuraTasksApp.Contexts;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AuraTasksApp.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    private readonly AuraTasksDbContext _context;

    public HomeController(ILogger<HomeController> logger, AuraTasksDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public IActionResult Index()
    {
        var allTasks = _context.Tasks.ToList();
        return View(allTasks);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    public IActionResult CreateEditTask(Tasks task)
    {
        _context.Tasks.Add(task);
        _context.SaveChanges();
        return RedirectToAction("Index");
    }

    [HttpPost]
    public IActionResult DeleteTask(int taskId)
    {
       var taskToRemove = _context.Tasks.Find(taskId);

       if(taskToRemove is not null)
       {
            _context.Tasks.Remove(taskToRemove);
            _context.SaveChanges();
            TempData["Message"] = "Task deleted successfully.";
       }
       else
       {
            TempData["Message"] = "Task couldn't be deleted";
       }

       return RedirectToAction("Index");
    }

    
    [HttpPost]
    public IActionResult UpdateTask([FromBody] Tasks model)
    {
        Tasks updatedTask = new Tasks()
        {
            Id = model.Id,
            TaskItem = model.TaskItem,
            Category = model.Category,
            Date = model.Date
        };

        _context.Update(model);
        _context.SaveChanges();

        // Simulate saving the task
        var message = $"Task '{updatedTask.TaskItem}' with category '{updatedTask.Category}' and date '{updatedTask.Date.ToShortDateString()}' updated successfully!";

        return Json(new {message = message});
    }

    [HttpPost]
    public IActionResult SaveTask([FromBody] Tasks model)
    {
        Tasks newTask = new Tasks() {
            TaskItem = model.TaskItem,
            Category = model.Category,
            Date = model.Date
        };

        _context.Tasks.Add(newTask);
        _context.SaveChanges();

         // Simulate saving the task
        var message = $"Task '{newTask.TaskItem}' with category '{newTask.Category}' and date '{newTask.Date.ToShortDateString()}' saved successfully!";
            
        return Json(new {message = message});
    }

}
