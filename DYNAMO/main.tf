resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name                = "connections-friends"
  billing_mode        = "PROVISIONED"
  read_capacity       = 10
  write_capacity      = 10
  autoscaling_enabled = true
  hash_key            = "id_connection"
  range_key           = "email_user"

  attribute {
    name = "id_connection"
    type = "S"
  }

  attribute {
    name = "email_user"
    type = "S"
  }

  #   attribute {
  #     name = "reactions"
  #     type = "S"
  #   }

  #   attribute {
  #     name = "updatedAt"
  #     type = "S"
  #   }

  ttl {
    attribute_name = "TimeToExist"
    enabled        = false
  }

  global_secondary_index {
    name               = "mainData"
    hash_key           = "id_connection"
    range_key          = "email_user"
    write_capacity     = 10
    read_capacity      = 10
    projection_type    = "INCLUDE"
    non_key_attributes = ["UserId"]
  }

  tags = {
    Name        = "dynamodb-table-connections"
    Environment = "production"
  }
}
