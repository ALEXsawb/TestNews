from rest_framework import permissions


class UserHavePermissionOrRead(permissions.BasePermission):
    def has_permission(self, request, view):
        request_method_to_part_permission_name = {'get': 'view', 'delete': 'delete', 'put': 'change', 'post': 'add'}
        action_part_permission = request_method_to_part_permission_name.pop(request.method.lower(), None)
        permission_name = f'news.{action_part_permission}_{view.table_name}'

        if permission_name in request.user.get_all_permissions():
            return True

        if request.method in permissions.SAFE_METHODS:
            return True
        return False
