variable "default_tag" {
    type = map(string)
    default = {
      "env" = "teamAcacia"
    }  
    description = "default tag to include in services built by teamAcacia"
}