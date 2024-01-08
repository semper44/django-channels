from django import template

register = template.Library()

@register.filter
def my_custom_filter(value):
    # Your custom filter logic here
    return list(reversed(value))
