# install Dependencies
 pip install --upgrade pip
pip install -r requirements.txt

# run Migrations
python manage.py collectstatic --no-input
python manage.py migrate --fake user zero
python manage.py migrate --fake admin zero
python manage.py migrate --fake-initial
python manage.py migrate
