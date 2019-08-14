from rest_framework.routers import DefaultRouter
from api.views import PrescriptionViewSet

router = DefaultRouter()
router.register(r'', PrescriptionViewSet, base_name='Prescriptions')
urlpatterns = router.urls
