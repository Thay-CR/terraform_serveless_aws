resource "aws_codecommit_repository" "test" {
  repository_name = "connections-friends"
  default_branch  = "main"
  description     = ""
}
