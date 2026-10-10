from django.contrib import admin

from .models import catdb, cathealth, profiles


class CathealthInline(admin.TabularInline):
    model = cathealth
    extra = 1


@admin.register(catdb)
class CatdbAdmin(admin.ModelAdmin):
    list_display = ('id', 'cat_name', 'breed', 'gender', 'age', 'cat_url')
    list_filter = ('gender', 'breed')
    search_fields = ('cat_name', 'cat_information', 'breed')
    inlines = [CathealthInline]


@admin.register(cathealth)
class CathealthAdmin(admin.ModelAdmin):
    list_display = ('id', 'cat', 'date', 'status', 'weight')
    list_filter = ('status', 'date')
    search_fields = ('cat__cat_name', 'note')


@admin.register(profiles)
class ProfilesAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'role')
