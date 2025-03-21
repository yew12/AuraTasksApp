namespace  AuraTasksApp.Models
{
    public class Tasks
    {
        public int Id { get; set; }
        public string TaskItem { get; set; } = "";
        public string? Category { get; set; }
        public DateTime Date { get; set; }
        public bool Completed { get; set; } = false;
    }
    
}