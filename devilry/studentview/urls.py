from django.conf.urls.defaults import *

urlpatterns = patterns('devilry.studentview',
    url(r'^list_deliveries/$',
        'views.list_deliveries', name='list_deliveries'),
    url(r'^show_delivery/(?P<delivery_id>\d+)$',
        'views.show_delivery', name='show-delivery'),
)
